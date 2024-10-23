# medusa-plugin-navigation

This is a plugin for MedusaJS designed to create navigations and menus so it can be used on storefronts. The project is in the stage of MVP at the moment but and need fixes mostly on frontend because some of the medusa ui component don't work according to their documentations.

The navigation gets returned in tree format and it's also sorted based on the sort you gave on the AdminUi.

The sort can be done by dragging items around and the tree has a depth of 2.

## Features

- Exposes custom endpoints to fetch feeds in XML or JSON format:

  - `/navigations/:id`
    `

    where id is the id of the navigation you want to give to frontEnd.

## Usage

### Plugin Options

To enable Admin UI extensions, please add the below into your plugins object inside medusa-config.js

```
{
    resolve:'medusa-plugin-navigation',
    options: {
      // other options
      enableUI: true,
    }
  }
```

## Contributing

The project is in its early stages. Contributions are welcome 💚🙏.
