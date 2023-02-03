# node_TP2

## How is stored data in database ?

### Users
Users are stored in the `users` collection.
Here is the User object :

```
{
  "username": String,
  "id": String
}
```

Example :
```JSON
{
"username":"RandomUser99",
"id":"d14ad887"
}
```

### Movies
They are stored in `movies` collection.
Here is the Movie object :

```
{
  "title": String,
  "id": String,
  "year": int,
  "language": String,
  "imbdRating": float,
  "note": String
}
```

Example :
```JSON
{
  "title": "My film",
  "id": "b7d1f091",
  "year": 2023,
  "language": "French",
  "imbdRating": 6.4,
  "note": "This is an example !"
}
```

### Watchlists
They are stored in `watchlists` collection.
Here is a Watchlist object :

```
{
  "owner": String,
  "name": String,
  "id": String,
  "movies": Array : {
      "id": String,
      "state": String
    }
  "note": String,
  "friends": Array<String>
}
```

Example :
```JSON
{
  "owner": "d14ad887",
  "name": "My watchlist",
  "id": "406434ae",
  "movies": [
    {
      "id": "b7d1f091",
      "state": "Watch later"
    }
  ],
  "note": "That's an example !",
  "friends": [
    "a27bf0b4"
  ]
}
```
