using System.ComponentModel.DataAnnotations;

namespace RestaurantListings.Data.Entities
{
    public class RestaurantRating
    {

        [Key]
        public string UserId { get; set; }

        [Key]
        public int RestaurantId { get; set; }

        public int Rating { get; set; }
    }
}
