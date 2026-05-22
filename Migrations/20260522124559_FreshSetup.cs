using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vkusochka.Migrations
{
    /// <inheritdoc />
    public partial class FreshSetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Dishes_DishId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Orderkits_OrderkitId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "Orderkits");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderkitId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_DishId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "BonusesUsed",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderkitId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DishId",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "PaymentMethod",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "OrderItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "PaymentMethod");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Orders",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<decimal>(
                name: "BonusesUsed",
                table: "Orders",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "OrderkitId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DishId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Orderkits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressId = table.Column<int>(type: "int", nullable: false),
                    SavedCardId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orderkits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orderkits_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orderkits_SavedCards_SavedCardId",
                        column: x => x.SavedCardId,
                        principalTable: "SavedCards",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orderkits_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderkitId",
                table: "Orders",
                column: "OrderkitId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_DishId",
                table: "OrderItems",
                column: "DishId");

            migrationBuilder.CreateIndex(
                name: "IX_Orderkits_AddressId",
                table: "Orderkits",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Orderkits_SavedCardId",
                table: "Orderkits",
                column: "SavedCardId");

            migrationBuilder.CreateIndex(
                name: "IX_Orderkits_UserId",
                table: "Orderkits",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Dishes_DishId",
                table: "OrderItems",
                column: "DishId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Orderkits_OrderkitId",
                table: "Orders",
                column: "OrderkitId",
                principalTable: "Orderkits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
