// �{�Ԋ��ł́A���[�J���L���b�V������A�Z�b�g��񋟂���T�[�r�X���[�J�[��o�^���܂��B

// ����ɂ��A���̌�̎��ғ����̃A�N�Z�X�ŃA�v���̓ǂݍ��݂������Ȃ�A�I�t���C���@�\���񋟂���܂��B 
// �������A�J���ҁi����у��[�U�[�j�́A�ȑO�ɃL���b�V�����ꂽ���\�[�X���o�b�N�O���E���h�ōX�V����邽�߁A
// �y�[�W�ւ́uN + 1�v�K��œW�J���ꂽ�X�V�݂̂�\�����邱�Ƃ��Ӗ����܂��B

// ���̃��f���̗��_�ɂ��ďڂ����́A https://goo.gl/KwvDNy ���������������B
// ���̃����N�ɂ́A���̓�����I�v�g�A�E�g����菇���܂܂�Ă��܂��B

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] ��IPv6 localhost�A�h���X�ł��B
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8�́AIPv4��localhost�ƌ��Ȃ���܂�
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // URL�R���X�g���N�^�[�́ASW���T�|�[�g���邷�ׂẴu���E�U�[�Ŏg�p�ł��܂��B
        const url = process.env.PUBLIC_URL as string;
        const publicUrl = new URL(url, window.location.toString());
        if (publicUrl.origin !== window.location.origin) {
            // PUBLIC_URL���y�[�W�̔z�M���ƈقȂ锭�M���ɂ���ꍇ�A�T�[�r�X���[�J�[�͋@�\���܂���B
            // ����́A�A�Z�b�g�̒񋟂�CDN���g�p�����ꍇ�ɔ�������\��������܂��B
            // https://github.com/facebookincubator/create-react-app/issues/2374 ���Q�Ƃ��Ă�������
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // ����̓��[�J���z�X�g�Ŏ��s����Ă��܂��B�T�[�r�X���[�J�[���܂����݂��邩�ǂ������m�F���܂��B
                checkValidServiceWorker(swUrl);
            } else {
                // ���[�J���z�X�g�ł͂���܂���B�T�[�r�X���[�J�[��o�^���邾��
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
                            // ���̎��_�ŁA�Â��R���e���c�͍폜����A�V�����R���e���c���L���b�V���ɒǉ�����܂��B
                            //�u�V�����R���e���c�����p�\�ł��B�X�V���Ă��������v�ƕ\������̂ɍœK�ȃ^�C�~���O�ł��B Web�A�v���̃��b�Z�[�W�B
                            console.log('�V�����R���e���c�����p�\�ł��B�X�V���Ă��������B');
                        } else {
                            // ���̎��_�ŁA���ׂĂ����O�ɃL���b�V������Ă��܂��B
                            // �u�R���e���c�̓I�t���C���Ŏg�p���邽�߂ɃL���b�V������܂��v��\������̂ɍœK�ȃ^�C�~���O�ł��B ���b�Z�[�W�B
                            console.log('�R���e���c�̓I�t���C���Ŏg�p���邽�߂ɃL���b�V������܂��B');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Service Worker�o�^���̃G���[:', error);
        });
}

function checkValidServiceWorker(swUrl: string) {
    // �T�[�r�X���[�J�[�������邩�ǂ������m�F���܂��B�y�[�W�������[�h�ł��Ȃ��ꍇ�B
    fetch(swUrl)
        .then(response => {
            // �T�[�r�X���[�J�[�����݂��AJS�t�@�C�����擾���Ă��邱�Ƃ��m�F���܂��B
            const contentType = response.headers.get('content-type');
            if (response.status === 404 || (contentType && contentType.indexOf('javascript') === -1)) {
                // �T�[�r�X���[�J�[��������܂���B�����炭�ʂ̃A�v���B�y�[�W�������[�h���܂��B
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // �T�[�r�X���[�J�[��������܂����B�ʏ�ǂ��葱�s���܂��B
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log('�C���^�[�l�b�g�ڑ���������܂���B�A�v���̓I�t���C�����[�h�Ŏ��s����Ă��܂��B');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
