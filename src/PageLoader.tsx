import React, { useState, useEffect, lazy } from 'react';
import shortid from 'shortid';

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
            console.log(pageName)
            const Page = await importPage(pageName);
            return <Page key={shortid.generate()} />;
        }
        // @ts-ignore 
        loadPage().then(setPage)
    }, [pageName]);
    return (
        <React.Suspense fallback="Loading views...">
            <div className="container">{page}</div>
        </React.Suspense>
    );
}

export default PageLoader;