using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantListings.Data;
using RestaurantListings.Data.Entities;
using RestaurantListings.Models;
namespace RestaurantListings.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public RestaurantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add or update an logged in User's rating and calculate a new average.
        /// </summary>
        /// <param name="restaurantId">Restaurant Id.</param>
        /// <param name="request">Request object <see cref="RestaurantUserRatingRequestModel">model</see>.</param>
        /// <returns>The <see cref="Restaurant"/> with an updated average rating.</returns>
        [Authorize]
        [HttpPost("{restaurantId}/RateRestaurant")]
        public async Task<IActionResult> rateRestaurant(int restaurantId, [FromBody] RestaurantUserRatingRequestModel request)
        {
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                int userRating = request.userRating;

                // Add or update user rating
                RestaurantRating restaurantRating = _context.RestaurantRatings
                                .FirstOrDefault(r => r.UserId == this.UserId && r.RestaurantId == restaurantId);

                System.Console.WriteLine(restaurantRating);

                if (restaurantRating == null)
                {
                    restaurantRating = new RestaurantRating { RestaurantId = restaurantId, UserId = this.UserId, Rating = userRating };
                    _context.RestaurantRatings.Add(restaurantRating);
                }
                else
                {
                    restaurantRating.Rating = userRating;
                    _context.RestaurantRatings.Update(restaurantRating);
                }

                await _context.SaveChangesAsync();

                // double AverageRating = _context.RestaurantRatings
                //     .Where(r => r.RestaurantId == restaurantId)
                //     .Average(r => r.Rating);

                // TODO: Simple weighted average
                var GroupedRatings = _context.RestaurantRatings
                  .Where(r => r.RestaurantId == restaurantId)
                  .GroupBy(r => r.Rating)
                  .Select(groupedRating => new
                  {
                      WeightedRating = groupedRating.Key * groupedRating.Count(),
                      NumUserRatings = groupedRating.Count()
                  });

                int totalWeigtedRatings = GroupedRatings.Select(gr => gr.WeightedRating).Sum();
                int totalNumRatings = GroupedRatings.Select(gr => gr.NumUserRatings).Sum();

                decimal AverageWeigtedRating = totalWeigtedRatings / totalNumRatings;

                Restaurant restaurant = _context.Restaurants.First(r => r.Id == restaurantId);
                restaurant.Rating = AverageWeigtedRating;
                // restaurant.Rating = (decimal)AverageRating;

                await _context.SaveChangesAsync();

                transaction.Commit();

                return Ok(restaurant);
            }
            catch (Exception)
            {
                transaction.Rollback();
                // Should be improved based on actual error
                return StatusCode(Microsoft.AspNetCore.Http.StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Returns all restaurants.
        /// </summary>
        [HttpGet]
        public IEnumerable<Restaurant> Get()
        {
            return _context.Restaurants.ToList();
        }
    }
}
