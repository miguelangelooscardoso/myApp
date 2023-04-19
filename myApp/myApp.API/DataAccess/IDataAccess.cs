using System;
using myApp.API.Models;

namespace myApp.API.DataAccess
{
    public interface IDataAccess
	{
        List<ItemCategory> GetItemCategories();
        ItemCategory GetItemCategory(int id);
        void InsertItemCategory(ItemCategory category);
        void DeleteItemCategory(int categoryId);
        Offer GetOffer(int id);
        List<Offer> GetAllOffers();
        void InsertOffer(Offer offer);
        void RemoveOffer(int offerId);
        List<Item> GetItems(string category, string artist, int count);
        List<Item> GetItemsByCategory(string category, string artist);
        List<Item> GetAllItems();
        int InsertItem(Item item);
        Item GetItem(int id);
        //bool InsertUser(User user);
        //string IsUserPresent(string email, string password);
        User GetUser(int id);
        void InsertFeedback(Feedback feedback);
        List<Feedback> GetItemFeedbacks(int itemId);
        bool InsertCartItem(int userid, int itemId);
        bool RemoveCartItem(int userId, int itemId);
        Cart GetActiveCartOfUser(int userid);
        Cart GetCart(int cartid);
        List<Cart> GetAllPreviousCartsOfUser(int userid);
        List<PaymentMethod> GetPaymentMethods();
        int InsertPayment(Payment payment);
        int InsertOrder(Order order);
    }
}

