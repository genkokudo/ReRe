using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ReactRedux
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // ���̃��\�b�h�̓����^�C���ɂ���ČĂяo����܂��B ���̃��\�b�h���g�p���āA�R���e�i�ɃT�[�r�X��ǉ����܂��B
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // �{�Ԋ��ł́AReact�t�@�C���͂��̃f�B���N�g������񋟂���܂�
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // ���̃��\�b�h�̓����^�C���ɂ���ČĂяo����܂��B ���̃��\�b�h���g�p���āAHTTP�v���p�C�v���C�����\�����܂��B
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // �f�t�H���g��HSTS�l�iSSL�T�[�o�ؖ����j��30���ł��B ���ғ��V�i���I�ł́A�����ύX���邱�Ƃ������߂��܂��B https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            // �p�u���b�V�����ɂ��� SPA �v���W�F�N�g���r���h���� ClientApp �̉��Ƀr���h���ʂ�ێ�
            // SpaStaticFiles ���g�p���� wwwroot ���ɑ��݂��Ȃ� SPA �̃r���h���ʂ����X�|���X���܂��B
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            // ���ׂĂ̗v�����f�t�H���g�y�[�W�ɏ��������A�ÓI�t�@�C���̒񋟂�ݒ肵�悤�Ƃ��܂��B
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
