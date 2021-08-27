import React from "react";
import { Renderer, updateVisualizationsSettings } from "@redash/viz";


function wrapComponentWithSettings(WrappedComponent) {
        return function VisualizationComponent(props) {
                updateVisualizationsSettings({
                        hidePlotlyModeBar: true,
                });

                return <WrappedComponent {...props} />;
        };
}

const RedashRenderer = wrapComponentWithSettings(Renderer);


export default RedashRenderer;