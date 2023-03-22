using System;
namespace myApp.API.Models
{
	public class Item
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public ItemCategory ItemCategory { get; set; } = new ItemCategory();
		public Offer Offer { get; set; } = new Offer();
		public double Price { get; set; }
		public int Quantity { get; set; }
		public string ImageName { get; set; } = string.Empty;
	}
}

