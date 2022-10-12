This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo
Attached to this git repository you can find a demo.mkv file.

## Getting Started

First, configure '.env' file and then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Folder structure

```
.
    ├── @types                  # Different typescript exported types used in the application.
    ├── components              # React components with their 'module.scss' styling files.
         ├── features           # Main features of the application are splitted in their own folder in here.
         ├── layout             # Application layout react component.
         ├── ui                 # UI custom react components (e.g. Button, Form).
    ├── context                 # Contains react cart context file and cart provider file.
    ├── enums                   # Enums that are used in the application.
    ├── pages                   # Next.js specific folder that contains the routing of the application, as well as the api endpoints.
        ├── api                 # Contains application api endpoints 
        ├── ./...               # Contains application routing index files.
    ├── prisma                  # ORM that is used to create database models and to help us with type safety.
    ├── public                  # Folder that contains image files used in the application.
    ├── styles                  # Contains global scss style files.
    ├── .example.env            # Contains an example of '.env' keys and what values do they expect.
    └── demo.mkv                # Demo video of the working application.
    
```


