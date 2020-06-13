using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RensyuRensyu.Infrastructure.Database;
using RensyuRensyu.Infrastructure.Services;

namespace RensyuRensyu
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // このメソッドはランタイムによって呼び出されます。 このメソッドを使用して、コンテナにサービスを追加します。
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddRazorPages();
            services.AddControllersWithViews()
            //    .AddRazorPagesOptions(options =>
            //{
            //    // Loginフォルダーは[AllowAnonymous]にする 
            //    options.Conventions.AllowAnonymousToFolder("/Login");
            //})
                ;

            // 本番環境では、Reactファイルはこのディレクトリから提供されます
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            // cshtml修正後、リロードですぐブラウザに反映する
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.AddTransient<IPasswordService, PasswordService>();

            // AutoMapperを使用する
            services.AddAutoMapper(typeof(Startup));

            // MediatRを使用する
            services.AddMediatR(typeof(Startup));
        }

        // このメソッドはランタイムによって呼び出されます。 このメソッドを使用して、HTTP要求パイプラインを構成します。
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("X-Frame-Options", "deny");
                context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
                context.Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
                context.Response.Headers.Add("Pragma", "no-cache");
                await next.Invoke();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // デフォルトのHSTS値（SSLサーバ証明書）は30日です。 実稼働シナリオでは、これを変更することをお勧めします。 https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            // パブリッシュ時にこの SPA プロジェクトもビルドして ClientApp の下にビルド結果を保持
            // SpaStaticFiles を使用して wwwroot 下に存在しない SPA のビルド結果をレスポンスします。
            app.UseSpaStaticFiles();

            // UseEndpointsによるルーティングを有効化
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            // すべての要求をデフォルトページに書き換え、静的ファイルの提供を設定しようとします。
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
