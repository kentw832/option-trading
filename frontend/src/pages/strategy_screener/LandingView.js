import React from "react";
import { Grid, Paper, Stack, Container, Divider, makeStyles, Typography, FormControl, Select, MenuItem, InputLabel, Box } from "@material-ui/core";
import TickerAutocomplete from "../../components/TickerAutocomplete";
import MetricLabel from '../../components/MetricLabel.js';

const useStyles = makeStyles((theme) => ({
    customPaper: {
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(7),
            paddingRight: theme.spacing(7),
            margin: theme.spacing(1),
            borderRadius: 50
        }
    }
}));

export default function LandingView(props) {
    const classes = useStyles();
    const {
        allTickers,
        selectedTicker,
        selectedExpirationTimestamp,
        onTickerSelectionChange,
        expirationTimestampsOptions,
        expirationDisabled,
        sentiment,
        onSentimentChange,
        onExpirationSelectionChange,
    } = props

    return (
        <Container style={{ minHeight: "inherit", padding: 0 }}>
            <br />
            <Container>
                <Paper className={classes.customPaper} elevation={4}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} divider={<Divider orientation="vertical" variant="middle" flexItem />} spacing={2}>
                        <TickerAutocomplete
                            tickers={allTickers}
                            onChange={onTickerSelectionChange}
                            value={selectedTicker}
                            displayLabel
                        />

                        <FormControl disabled={expirationDisabled} fullWidth>
                            <InputLabel><Typography variant="h6">Option Expiration Date</Typography></InputLabel>
                            <Select
                                id="expiration-dates"
                                value={selectedExpirationTimestamp}
                                fullWidth
                                placeholder="Select an expiration date"
                                onChange={(e) => onExpirationSelectionChange(e.target.value)}
                                style={{ paddingBottom: "5px" }}
                                variant="standard"
                            >
                                <MenuItem disabled value={"none"}><span style={{ color: "gray" }}>Select an expiration date</span></MenuItem>
                                {expirationTimestampsOptions.map((date, index) => <MenuItem value={date.value} key={index}> {date.label} </MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl disabled={expirationDisabled} fullWidth>
                            <InputLabel><Typography variant="h6"><MetricLabel label='price target'></MetricLabel></Typography></InputLabel>
                            <Select
                                id="sentiment"
                                value={sentiment}
                                fullWidth
                                onChange={(e) => onSentimentChange(e.target.value)}
                                style={{ paddingBottom: "5px" }}
                                variant="standard"
                            >
                                <MenuItem disabled value={0}><span style={{ color: "gray" }}>Select a Price Target</span></MenuItem>
                                <MenuItem value={1.2}>+20%</MenuItem>
                                <MenuItem value={1.1}>+10%</MenuItem>
                                <MenuItem value={1.05}>+5%</MenuItem>
                                <MenuItem value={1}>0%</MenuItem>
                                <MenuItem value={0.95}>-5%</MenuItem>
                                <MenuItem value={0.9}>-10%</MenuItem>
                                <MenuItem value={0.8}>-20%</MenuItem>
                            </Select>
                        </FormControl>

                    </Stack>
                </Paper>
            </Container>
            <br />
            <Container>
                <Typography variant="h4" align="center">Discover option strategies with the best potential return.</Typography>
                <br />
                <Typography variant="body1" align="center">
                    Enter <b>what price</b> you think the stock will be and by <b>when</b>.
                    <br />
                    See the trades you can make to get the highest potential return.
                    </Typography>
            </Container>
            <br />
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                <Box px={2} py={4} bgcolor="white" borderRadius={1}>
                    <Grid container direction="column" alignItems="center">
                        <img style={{ height: 200, width: 270, marginBottom: 8 }} src="discover_step_1.png" alt="step 1" />
                        <Typography variant="button">Step 1</Typography>
                        <Typography variant="subtitle1">Select a stock by its ticker</Typography>
                        <Typography variant="body2">AAPL, AMZN, TSLA...</Typography>
                    </Grid>
                </Box>
                <Box px={2} py={4} bgcolor="white" borderRadius={1}>
                    <Grid container direction="column" alignItems="center">
                        <img style={{ height: 200, width: 270, marginBottom: 8 }} src="discover_step_2.png" alt="step 2" />
                        <Typography variant="button">Step 2</Typography>
                        <Typography variant="subtitle1">Select an expiration date</Typography>
                        <Typography variant="body2">Your timeframe for the strategy</Typography>
                    </Grid>
                </Box>
                <Box px={2} py={4} bgcolor="white" borderRadius={1}>
                    <Grid container direction="column" alignItems="center">
                        <img style={{ height: 200, width: 270, marginBottom: 8 }} src="discover_step_3.png" alt="step 3" />
                        <Typography variant="button">Step 3</Typography>
                        <Typography variant="subtitle1">Enter a price target</Typography>
                        <Typography variant="body2">Where do you think the price will be?</Typography>
                    </Grid>
                </Box>
                <Box px={2} py={4} bgcolor="white" borderRadius={1}>
                    <Grid container direction="column" alignItems="center">
                        <img style={{ height: 200, width: 270, marginBottom: 8 }} src="discover_step_4.png" alt="step 4" />
                        <Typography variant="button">Step 4</Typography>
                        <Typography variant="subtitle1">Discover the best strategies</Typography>
                        <Typography variant="body2">We calculate and show you the best one</Typography>
                    </Grid>
                </Box>
            </Grid>
        </Container>
    );
}
