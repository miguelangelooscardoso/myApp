using System;
using myApp.API.Models;

namespace myApp.API.DataAccess
{
    public interface IDataAccess
	{
        List<ItemCategory> GetItemCategories();
        ItemCategory GetItemCategory(int id);
        Offer GetOffer(int id);
        List<Item> GetItems(string category, string artist, int count);
        Item GetItem(int id);
        bool InsertUser(User user);
        string IsUserPresent(string email, string password);
        void InsertFeedback(Feedback feedback);
        List<Feedback> GetItemFeedbacks(int itemId);
        User GetUser(int id);
        bool InsertCartItem(int userid, int itemId);
        Cart GetActiveCartOfUser(int userid);
        Cart GetCart(int cartid);
        List<Cart> GetAllPreviousCartsOfUser(int userid);
        List<PaymentMethod> GetPaymentMethods();
        int InsertPayment(Payment payment);
        int InsertOrder(Order order);
    }
}

