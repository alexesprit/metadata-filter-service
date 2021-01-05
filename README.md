# metadata-filter-service

[metadata-filter](https://github.com/web-scrobbler/metadata-filter) as a service.

## Usage

An online instance is available at https://metadata-filter.vercel.app/.

## API

The format of request URL is `/api/:filter?query`, where

-   `filter` is a name of any available filters
-   `query` is a filter query string containing fields to filter and their values

For example, query for filtering track field is `track=TrackName`. You can put multiple fields as well - join them with ampersand.

The response is a JSON in the following format:

```ts
interface SuccessResponse {
	status: 'success';
	data: {
		[field: string]: string;
	};
}

interface ErrorResponse {
	status: 'error';
	message: string;
}
```

### Available filters

The service uses predefined filters from `metadata-filter`:

-   Amazon (`/api/amazon`)
-   Remastered (`/api/remastered`)
-   Spotify (`/api/spotify`)
-   Tidal (`/api/tidal`)
-   YouTube (`/api/youtube`)

Each filter can process different fields. See [src/filters.ts](https://github.com/web-scrobbler/metadata-filter/blob/master/src/filters.ts) of `metadata-filter` for details.

### Example

For example, we want to filter "If I Get High (Official Video)" track name with YouTube filter.

Requesting `/api/youtube?track=If%20I%20Get%20High%20(Official%20Video)` will return a response with filter result in JSON format.

```json
{
	"status": "success",
	"data": {
		"track": "If I Get High"
	}
}
```

## Development

```sh
# Install dependencies
> npm install

# Run dev server
> npx vercel dev

# Run linter
> npm run lint

# Run tests
> npm test

# Format files
> npm run format
```

## License

Licensed under the [MIT License](LICENSE).
