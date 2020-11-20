import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import RangeSlider from 'react-bootstrap-range-slider';
import Axios from 'axios';
import getApiUrl, {
    PercentageFormatter, PriceFormatter, TimestampWithDaysFormatter, NumberRoundFormatter,
    ExpandContractRow, InTheMoneyRowStyle, InTheMoneySign, onInTheMoneyFilterChange, SmallTextFormatter
} from '../utils';
import filterFactory, { multiSelectFilter } from 'react-bootstrap-table2-filter';

let inTheMoneyFilter;

export default function BestCallByPrice({ selectedTicker, expirationTimestamps }) {
    const API_URL = getApiUrl();
    const [showTimestampAlert, setShowTimestampAlert] = useState(false);
    const [bestCalls, setBestCalls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedExpirationTimestamps, setSelectedExpirationTimestamps] = useState([]);
    const [tradeoffValue, setTradeoffValue] = React.useState(0.0);

    const selectOptions = {
        true: 'ITM',
        false: 'OTM'
    };
    const result_table_columns = [
        {
            dataField: "strike",
            text: "Strike",
            formatter: PriceFormatter
        }, {
            dataField: "estimated_premium",
            text: "Premium",
            formatter: PriceFormatter
        }, {
            dataField: "break_even_price",
            text: "Breakeven Point",
            formatter: PriceFormatter
        }, {
            dataField: "gain",
            text: "Option Gain",
            formatter: PercentageFormatter
        }, {
            dataField: "stock_gain",
            text: "Stock Gain",
            formatter: PercentageFormatter
        }, {
            dataField: "normalized_score",
            text: "Final Score",
            formatter: NumberRoundFormatter,
            sort: true
        }, {
            dataField: 'in_the_money',
            text: 'In the money',
            // hidden: true, getFilter() won't be called if hidden is true.
            style: { 'display': 'none' },
            headerStyle: { 'display': 'none' },
            formatter: cell => selectOptions[cell],
            filter: multiSelectFilter({
                options: selectOptions,
                getFilter: (filter) => {
                    inTheMoneyFilter = filter;
                }
            })
        },
        {
            dataField: "expiration",
            text: "Expiration",
            formatter: (cell, row, rowIndex, extraData) => (
                TimestampWithDaysFormatter(cell, row.days_till_expiration)
            )
        },
        {
            dataField: 'contract_symbol',
            text: 'Contract Symbol',
            formatter: SmallTextFormatter
        }];

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());

        if (selectedExpirationTimestamps.length > 0) {
            setShowTimestampAlert(false);
        } else {
            setShowTimestampAlert(true);
        }

        if (form.checkValidity() !== false && selectedExpirationTimestamps.length > 0) {
            setLoading(true);
            getBestCalls(formDataObj.target_price, selectedExpirationTimestamps);
        }
    };

    const handleInputChange = (event) => {
        const target = event.target;
        var value = target.value;

        if (target.checked) {
            setSelectedExpirationTimestamps(selectedExpirationTimestamps.concat([value]));
        } else {
            setSelectedExpirationTimestamps(selectedExpirationTimestamps.filter(item => item !== value));
        }
    };

    const getBestCalls = async (targetPrice, selectedExpirationTimestamps) => {
        try {
            let url = `${API_URL}/tickers/${selectedTicker}/calls/?target_price=${targetPrice}&`;
            selectedExpirationTimestamps.map((timestamp) => { url += `expiration_timestamps=${timestamp}&` });
            url += `month_to_percent_gain=${tradeoffValue}`
            const response = await Axios.get(url);
            setBestCalls(response.data.all_calls);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h4>Best call options to buy with targeted price</h4>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className="font-weight-bold">Target price (USD):</Form.Label>
                    <Form.Control name="target_price" as="input" type="number" placeholder="100.0" min="0.0" required />
                </Form.Group>
                <Form.Group>
                    {showTimestampAlert ?
                        <Alert variant="warning">
                            Please select at least one expiration date.
                                </Alert>
                        :
                        null
                    }
                    <Form.Label className="font-weight-bold">Expiration Dates:</Form.Label>
                    <div className="row">
                        {expirationTimestamps.map((timestamp, index) => {
                            // Yahoo's contract expiration timestamp uses GMT.
                            const date = new Date(timestamp * 1000).toLocaleDateString('en-US', { 'timeZone': 'GMT' });
                            return (
                                <div className="col-sm-3" key={index}>
                                    <Form.Check
                                        value={timestamp}
                                        name={`expiration_date_${timestamp}`}
                                        type="checkbox"
                                        id={`checkbox-${timestamp}`}
                                        label={date}
                                        onChange={handleInputChange}
                                    />
                                </div>);
                        })}
                    </div>
                </Form.Group>
                <div className="font-weight-bold">Month to gain tradeoff: </div>
                <div>Reduce {(tradeoffValue * 100.0).toFixed(2)}% gain for 30 days additional expiration time.</div>
                <div>
                    <RangeSlider
                        value={tradeoffValue}
                        onChange={e => setTradeoffValue(e.target.value)}
                        tooltipLabel={currentValue => `${(currentValue * 100.0).toFixed(2)}%`}
                        step={0.0025}
                        min={0.0}
                        max={0.1}
                        tooltip='auto'
                        size='sm'
                    />
                </div>
                <br />
                <Button type="submit">Analyze</Button>
            </Form>
            <br />
            {InTheMoneySign()}

            <div className="row">
                <Form>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Filter by strike price:</Form.Label>
                        <Form.Control name="tradeoff" as="select" defaultValue={0}
                            onChange={(e) => onInTheMoneyFilterChange(e, inTheMoneyFilter)}>
                            <option key="all" value="all">All</option>
                            <option key="itm" value="itm">In the money</option>
                            <option key="otm" value="otm">Out of the money</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>

            <BootstrapTable
                classes="table-responsive"
                loading={loading}
                bootstrap4={true}
                keyField="contract_symbol"
                data={bestCalls}
                columns={result_table_columns}
                pagination={paginationFactory({
                    sizePerPage: 25,
                    hidePageListOnlyOnePage: true
                })}
                noDataIndication="No Data"
                bordered={false}
                expandRow={ExpandContractRow()}
                rowStyle={InTheMoneyRowStyle}
                filter={filterFactory()}
            />
        </div >
    );
}