﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RensyuRensyu.Infrastructure.Database;

namespace RensyuRensyu.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("RensyuRensyu.Entities.Company", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(100) CHARACTER SET utf8mb4")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.Crud", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long?>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PassWord")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<byte[]>("Salt")
                        .HasColumnType("longblob");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Cruds");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.ReportRefProbabilityEntity", b =>
                {
                    b.Property<long>("ReportRefProbabilityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Category")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<long>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<string>("Condition")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<decimal>("IncreaseProbability")
                        .HasColumnType("decimal(6, 2)");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<decimal>("Probability")
                        .HasColumnType("decimal(6, 2)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<long>("UpdatedUserId")
                        .HasColumnType("bigint");

                    b.Property<long>("Version")
                        .HasColumnType("bigint");

                    b.HasKey("ReportRefProbabilityId");

                    b.HasIndex("CompanyId", "Category", "Condition", "Probability", "IncreaseProbability")
                        .IsUnique();

                    b.ToTable("ReportRefProbabilities");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.TestData", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("TestDatas");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long?>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("PassWord")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<byte[]>("Salt")
                        .HasColumnType("longblob");

                    b.HasKey("UserId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.UserAuthority", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<int>("Authority")
                        .HasColumnType("int");

                    b.Property<long?>("CrudId")
                        .HasColumnType("bigint");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CrudId");

                    b.HasIndex("UserId");

                    b.ToTable("UserAuthorities");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.Crud", b =>
                {
                    b.HasOne("RensyuRensyu.Entities.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.User", b =>
                {
                    b.HasOne("RensyuRensyu.Entities.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("RensyuRensyu.Entities.UserAuthority", b =>
                {
                    b.HasOne("RensyuRensyu.Entities.Crud", null)
                        .WithMany("UserAuthorities")
                        .HasForeignKey("CrudId");

                    b.HasOne("RensyuRensyu.Entities.User", null)
                        .WithMany("UserAuthorities")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
