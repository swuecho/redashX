import React, { useState, useEffect, lazy } from 'react';
import { nanoid } from 'nanoid'


// page loader
const importPage = (pageName: string) =>
    lazy(() =>
        import(`./pages${pageName}`).catch(() =>
            import(`./pages/home`)
        )
    );

interface PageName {
    pageName: string
}

function PageLoader({ pageName }: PageName) {
    const [page, setPage] = useState([]);
    useEffect(() => {
        async function loadPage() {
            const Page = await importPage(pageName);
            return <Page key={nanoid()} />;
        }
        // @ts-ignore 
        loadPage().then(setPage)
    }, [pageName]);
    return (
        <React.Suspense fallback="Loading views...">
            <>{page} </>
        </React.Suspense>
    );
}

export default PageLoader;