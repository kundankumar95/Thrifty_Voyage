from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from dataCollection import print_hotels_below_price_and_city
global distance
def calculate_travel_information(origin_location, destination_location, break_location, budget, expenses, person, days):
    geolocator = Nominatim(user_agent="distance_calculator")

    origin_coords = geolocator.geocode(origin_location)
    destination_coords = geolocator.geocode(destination_location)
    break_coords = geolocator.geocode(break_location)
    if origin_coords and destination_coords:
        distance = geodesic((origin_coords.latitude, origin_coords.longitude),
                       (destination_coords.latitude, destination_coords.longitude)).kilometers
        distance_1 = geodesic((origin_coords.latitude, origin_coords.longitude),
                       (break_coords.latitude, break_coords.longitude)).kilometers
        distance_2 = geodesic((break_coords.latitude, break_coords.longitude),
                       (destination_coords.latitude, destination_coords.longitude)).kilometers
        remaining_money = budget - expenses
        total_cost_of_train_tciket = ((0.5)*distance*person)
        total_updown_train = 2*total_cost_of_train_tciket
        
        total_cost_of_flight_tciket = 5*distance*person
        total_updown_flight = 2*total_cost_of_flight_tciket
        minimum = min(total_updown_train,total_updown_flight)
        total_cost_of_uptrain_downflight = 2*(total_cost_of_flight_tciket + total_cost_of_train_tciket)
        total_mini = min(minimum,total_cost_of_uptrain_downflight)
        total_cost_by_breaking_1 =2*((0.5)*distance_1*person + 5*distance_2*person)
        total_cost_by_breaking_2 =2*((5)*distance_1*person + 0.5*distance_2*person)
        
        minimum_breaking = min(total_cost_by_breaking_1,total_cost_by_breaking_2)
        if(total_cost_by_breaking_1 < total_cost_by_breaking_2):
            print(f"you can user train from {origin_location} to {break_location} and flight from {break_location} to {destination_location}")
        else:
            print(f"you can user flight from {origin_location} to {break_location} and train from {break_location} to {destination_location}")
            minimum_price = int(min(minimum_breaking,total_mini))
            print(f"Minimum cost of traveling: {minimum_price}")
    
    def calculate_time(case_value_for_time):
        if case_value_for_time == 1:
            time_taken_by_flight = distance/882.5
            print(f"You can travel by flight in {time_taken_by_flight :.2f} hours")
        else:
            preference = input("Enter Your Preference:")
        if preference.islower() == "flight":
            time_taken_by_flight = distance/882.5
            print(f"Time taken by flight {time_taken_by_flight :.2f} hours")
        elif preference.islower() == "breakingjourney":
            time_taken_by_flight_1 = distance_1/882.5
            time_taken_by_train_1 = distance_2/160
            time_taken_by_flight_2 = distance_2/882.5
            time_taken_by_train_2 = distance_1/160
            Total_time_taken_in_break_journey_1 = time_taken_by_flight_1 + time_taken_by_train_1
            Total_time_taken_in_break_journey_2 = time_taken_by_flight_2 + time_taken_by_train_2
            minimum_time_in_break_journey = min(Total_time_taken_in_break_journey_1,Total_time_taken_in_break_journey_2)
            if Total_time_taken_in_break_journey_1 < Total_time_taken_in_break_journey_2:
                print(f"Time taken by flight from {origin_location} to {break_location} and by train {break_location} to {destination_location} is {minimum_time_in_break_journey:.2f}")
            else:
                print(f"Time taken by train from {origin_location} to {break_location} and by flight {break_location} to {destination_location} is {minimum_time_in_break_journey:.}")

        else:
            time_taken_by_train = distance/160
            print(f"time taken by train {time_taken_by_train :.2f} hours")



    case_value_for_time = int(input("Tell us how crucial arriving on time is for your trip(1.URGENT/2.ON TIME):"))
    calculate_time(case_value_for_time)


    
    rest_amount = remaining_money - minimum_price

    price_per_day = rest_amount / days

    return {
        "minimum_price": minimum_price,
        "rest_amount": rest_amount,
        "price_per_day": price_per_day,
        "hotels": print_hotels_below_price_and_city(destination_location, price_per_day),
    }

