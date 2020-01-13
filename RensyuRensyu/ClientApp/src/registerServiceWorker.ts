// 本番環境では、ローカルキャッシュからアセットを提供するサービスワーカーを登録します。

// これにより、その後の実稼働時のアクセスでアプリの読み込みが速くなり、オフライン機能が提供されます。 
// ただし、開発者（およびユーザー）は、以前にキャッシュされたリソースがバックグラウンドで更新されるため、
// ページへの「N + 1」訪問で展開された更新のみを表示することも意味します。

// このモデルの利点について詳しくは、 https://goo.gl/KwvDNy をご覧ください。
// このリンクには、この動作をオプトアウトする手順も含まれています。

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] はIPv6 localhostアドレスです。
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8は、IPv4のlocalhostと見なされます
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // URLコンストラクターは、SWをサポートするすべてのブラウザーで使用できます。
        const url = process.env.PUBLIC_URL as string;
        const publicUrl = new URL(url, window.location.toString());
        if (publicUrl.origin !== window.location.origin) {
            // PUBLIC_URLがページの配信元と異なる発信元にある場合、サービスワーカーは機能しません。
            // これは、アセットの提供にCDNが使用される場合に発生する可能性があります。
            // https://github.com/facebookincubator/create-react-app/issues/2374 を参照してください
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // これはローカルホストで実行されています。サービスワーカーがまだ存在するかどうかを確認します。
                checkValidServiceWorker(swUrl);
            } else {
                // ローカルホストではありません。サービスワーカーを登録するだけ
                registerValidSW(swUrl);
            }
        });
    }
}

function registerValidSW(swUrl: string) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing as ServiceWorker;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // この時点で、古いコンテンツは削除され、新しいコンテンツがキャッシュに追加されます。
                            //「新しいコンテンツが利用可能です。更新してください」と表示するのに最適なタイミングです。 Webアプリのメッセージ。
                            console.log('新しいコンテンツが利用可能です。更新してください。');
                        } else {
                            // この時点で、すべてが事前にキャッシュされています。
                            // 「コンテンツはオフラインで使用するためにキャッシュされます」を表示するのに最適なタイミングです。 メッセージ。
                            console.log('コンテンツはオフラインで使用するためにキャッシュされます。');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Service Worker登録中のエラー:', error);
        });
}

function checkValidServiceWorker(swUrl: string) {
    // サービスワーカーが見つかるかどうかを確認します。ページをリロードできない場合。
    fetch(swUrl)
        .then(response => {
            // サービスワーカーが存在し、JSファイルを取得していることを確認します。
            const contentType = response.headers.get('content-type');
            if (response.status === 404 || (contentType && contentType.indexOf('javascript') === -1)) {
                // サービスワーカーが見つかりません。おそらく別のアプリ。ページをリロードします。
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // サービスワーカーが見つかりました。通常どおり続行します。
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log('インターネット接続が見つかりません。アプリはオフラインモードで実行されています。');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
