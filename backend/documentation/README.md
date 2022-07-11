
# Api Documentation

### How to get started?
You should have got a __.env__ file at the root of the project. Within it, you 
should put something like this: 

```bash
JWT_SECRET="super secret key"
PORT=<port for the server to listen>
```

The port parameter is optional. By default, the server's gonna listen on port 3333.
The __JWT_SECRET__ is your secret for jwt authentication. You should keep this secret 
as secure as possible!

To start your api, just run the command: 

```bash
yarn dev 
```

### How to generate api route docs.
In order to generate your api route docs, run the following command:

```bash
npx insomnia-documenter --config ./documentation.json
```

Then, you can run a server with your brand new generated docs with:

```bash
npx serve
```

Now it's as simple as opening a new tab on your favourite browser and accessing the link:
> http://localhost:3000
