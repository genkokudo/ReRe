using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RensyuRensyu.Migrations
{
    public partial class User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAuthorities_UserEntity_UserEntityUserId",
                table: "UserAuthorities");

            migrationBuilder.DropTable(
                name: "UserEntity");

            migrationBuilder.DropIndex(
                name: "IX_UserAuthorities_UserEntityUserId",
                table: "UserAuthorities");

            migrationBuilder.DropColumn(
                name: "UserEntityUserId",
                table: "UserAuthorities");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "UserAuthorities",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    PassWord = table.Column<string>(nullable: true),
                    Salt = table.Column<byte[]>(nullable: true),
                    CompanyId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAuthorities_UserId",
                table: "UserAuthorities",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanyId",
                table: "Users",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAuthorities_Users_UserId",
                table: "UserAuthorities",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAuthorities_Users_UserId",
                table: "UserAuthorities");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_UserAuthorities_UserId",
                table: "UserAuthorities");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserAuthorities");

            migrationBuilder.AddColumn<long>(
                name: "UserEntityUserId",
                table: "UserAuthorities",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserEntity",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "varchar(255) CHARACTER SET utf8mb4", nullable: true),
                    PassWord = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true),
                    Salt = table.Column<byte[]>(type: "longblob", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserEntity", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_UserEntity_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAuthorities_UserEntityUserId",
                table: "UserAuthorities",
                column: "UserEntityUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserEntity_CompanyId",
                table: "UserEntity",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserEntity_Name",
                table: "UserEntity",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAuthorities_UserEntity_UserEntityUserId",
                table: "UserAuthorities",
                column: "UserEntityUserId",
                principalTable: "UserEntity",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
