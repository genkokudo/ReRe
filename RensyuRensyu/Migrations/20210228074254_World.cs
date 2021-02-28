using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RensyuRensyu.Migrations
{
    public partial class World : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cruds_Companies_CompanyId",
                table: "Cruds");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ReportRefProbabilities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAuthorities",
                table: "UserAuthorities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserAuthorities");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Companies");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255) CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLogin",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastPasswordCorrection",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "LastPasswordIncollectCount",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PasswordIncollectCount",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "UserAuthorityId",
                table: "UserAuthorities",
                nullable: false,
                defaultValue: 0L)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<long>(
                name: "CompanyId",
                table: "Companies",
                nullable: false,
                defaultValue: 0L)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Companies",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAuthorities",
                table: "UserAuthorities",
                column: "UserAuthorityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "CompanyId");

            migrationBuilder.CreateTable(
                name: "Worlds",
                columns: table => new
                {
                    WorldId = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UpdatedUserId = table.Column<long>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: false),
                    Version = table.Column<long>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    CompanyId = table.Column<long>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Probability = table.Column<decimal>(type: "decimal(6, 2)", nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Worlds", x => x.WorldId);
                    table.ForeignKey(
                        name: "FK_Worlds_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Worlds_CompanyId",
                table: "Worlds",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Worlds_Name",
                table: "Worlds",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cruds_Companies_CompanyId",
                table: "Cruds",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cruds_Companies_CompanyId",
                table: "Cruds");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Worlds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAuthorities",
                table: "UserAuthorities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "LastLogin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastPasswordCorrection",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastPasswordIncollectCount",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordIncollectCount",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserAuthorityId",
                table: "UserAuthorities");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Companies");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "varchar(255) CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "UserAuthorities",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "Companies",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAuthorities",
                table: "UserAuthorities",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ReportRefProbabilities",
                columns: table => new
                {
                    ReportRefProbabilityId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Category = table.Column<string>(type: "varchar(255) CHARACTER SET utf8mb4", nullable: true),
                    CompanyId = table.Column<long>(type: "bigint", nullable: false),
                    Condition = table.Column<string>(type: "varchar(255) CHARACTER SET utf8mb4", nullable: true),
                    IncreaseProbability = table.Column<decimal>(type: "decimal(6, 2)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    Probability = table.Column<decimal>(type: "decimal(6, 2)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedUserId = table.Column<long>(type: "bigint", nullable: false),
                    Version = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportRefProbabilities", x => x.ReportRefProbabilityId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReportRefProbabilities_CompanyId_Category_Condition_Probabil~",
                table: "ReportRefProbabilities",
                columns: new[] { "CompanyId", "Category", "Condition", "Probability", "IncreaseProbability" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cruds_Companies_CompanyId",
                table: "Cruds",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
