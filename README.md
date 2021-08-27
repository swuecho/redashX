# Redash MDX

use Redash Api and Redash/Vis to generate report using MDX.

custom dashboard with all the redash visualization + MDX.

## fetch data

1. write your query in Redash, write down the query id.
2. use the query id to fetch data. `useRedashData(query_id)`
3. use the data in your custom React Component.


## plot data

1. create plot in Redash, write down the query id and plot id.
2. use the plot in your MDX. `useRedashPlot(query_id, plot_id)`


