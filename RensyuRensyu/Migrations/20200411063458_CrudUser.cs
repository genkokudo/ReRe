using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RensyuRensyu.Migrations
{
    public partial class CrudUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CrudId",
                table: "UserAuthorities",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CompanyId",
                table: "Cruds",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PassWord",
                table: "Cruds",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Salt",
                table: "Cruds",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAuthorities_CrudId",
                table: "UserAuthorities",
                column: "CrudId");

            migrationBuilder.CreateIndex(
                name: "IX_Cruds_CompanyId",
                table: "Cruds",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cruds_Companies_CompanyId",
                table: "Cruds",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAuthorities_Cruds_CrudId",
                table: "UserAuthorities",
                column: "CrudId",
                principalTable: "Cruds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cruds_Companies_CompanyId",
                table: "Cruds");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAuthorities_Cruds_CrudId",
                table: "UserAuthorities");

            migrationBuilder.DropIndex(
                name: "IX_UserAuthorities_CrudId",
                table: "UserAuthorities");

            migrationBuilder.DropIndex(
                name: "IX_Cruds_CompanyId",
                table: "Cruds");

            migrationBuilder.DropColumn(
                name: "CrudId",
                table: "UserAuthorities");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Cruds");

            migrationBuilder.DropColumn(
                name: "PassWord",
                table: "Cruds");

            migrationBuilder.DropColumn(
                name: "Salt",
                table: "Cruds");
        }
    }
}
