# Redash MDX

Redash Dashboard with mdx support

use Redash API and Redash/Vis in MDX to write report (dashboard).  


## fetch data

1. write your query in Redash, write down the query id.
2. use the query id to fetch data. `useRedashData(queryId)`
3. use the data in your custom React Component.


## plot data

1. create plot in Redash, write down the query id and plot id.  `http://192.168.0.135/queries/53/source#76 -> (53, 76)`
2. use the plot in your MDX. `<RedashPlot queryId={53} plotId={76}></RedashPlot>`


related: https://www.evidence.dev/

test