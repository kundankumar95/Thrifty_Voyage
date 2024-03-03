import json

def extract_city(location):
    if isinstance(location, dict) and "City" in location:
        return location["City"]
    elif isinstance(location, str):
        return location
    return ""

def print_hotels_below_price_and_city(city, max_price):
    try:
        with open(r'C:\Users\Kundan\Downloads\1st SIH Code\SIH Code\data.json') as json_file:
            data = json.load(json_file)
        processed_hotels = set()

        for document in data:
            room_data = document.get("Room", [])
            document_city = extract_city(document.get("Location", ""))
            
            if document_city.lower() == city.lower() and any(int(room.get("price", 0)) <= max_price for room in room_data):
                hotel_name = document.get("name")
                if hotel_name not in processed_hotels:
                    processed_hotels.add(hotel_name)

                    print("Matching Hotel:")
                    print("Hotel Name:", hotel_name)
                    for room in room_data:
                        room_price = int(room.get("price", 0))
                        if room_price <= max_price:
                            print("Room Type:", room["type"])
                            print("Availability:", room["availability"])
                            print("Price:", room_price)
                    print("Location:", document_city)
                    print()

        if not processed_hotels:
            print("No hotels found matching the criteria.")

    except FileNotFoundError:
        print("Error: JSON file not found.")

    except ValueError as ve:
        print(f"Invalid input. Error: {ve}")