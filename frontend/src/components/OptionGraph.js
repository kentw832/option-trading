import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button, Row, Col } from "react-bootstrap";

function OptionGraph(props) {
    const { trade } = props;

    let xMin = trade.break_even_price - (trade.break_even_price * .1);
    let xMax = trade.break_even_price + (trade.break_even_price * .1);
    let data = [];

    trade.graph_x_points.forEach((x, i) => {
        let point = {};
        point.x = x;
        point.y = trade.graph_y_points[i];
        data.push(point);
    });

    const options = {
        chart: {
            type: 'area',
            zoomType: 'xy',
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: 'Profit/Loss Graph'
        },
        subtitle: {
            text: 'Click and drag to zoom in. Hold down shift key to pan.'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'numeric',
            min: xMin,
            max: xMax,
            title: {
                text: 'Stock Price'
            },
            plotLines: [
                {
                    color: 'green',
                    width: 2,
                    value: trade.break_even_price,
                    label: {
                        rotation: 0,
                        y: 30,
                        style: {
                            fontStyle: 'italic',
                            color: 'green'
                        },
                        text: 'Breakeven Price'
                    },
                    zIndex: 100
                },
                {
                    color: 'black',
                    width: 2,
                    value: trade.stock.stock_price,
                    label: {
                        rotation: 0,
                        y: 15,
                        style: {
                            fontStyle: 'italic',
                        },
                        text: 'Current Price'
                    },
                    zIndex: 100
                }
            ],
        },
        yAxis: {
            title: {
                text: 'Profit/Loss'
            },
            labels: {
                format: '${value}'
            },
        },
        tooltip: {
            headerFormat: 'Stock Price: ${point.x:,.2f} <br/>',
            pointFormat: 'Profit/Loss: ${point.y:,.2f}',
        },
        series: [{
            name: 'Profit',
            data: data,
            marker: {
                enabled: false
            },
            color: '#00ff50',
            negativeColor: '#ff0050'
        }]
    };

    return (
        <Row className="row justify-content-center">
            <Col className="mixed-chart">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Col>
        </Row>
    );
}

export default OptionGraph;
