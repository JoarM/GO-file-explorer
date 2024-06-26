import { useRouteError } from "react-router";

export default function ErrorPage() {
    const error = useRouteError() as any
    console.error(error)

    return (
        <main className="h-full grid place-items-center">
            <div>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </main>
    )
}