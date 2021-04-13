using System.ComponentModel.DataAnnotations;

namespace RestaurantListings.Models
{
    public class RestaurantUserRatingRequestModel
    {
        [Required]
        public int userRating { get; set; }
    }
}