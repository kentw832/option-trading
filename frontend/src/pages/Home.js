import React, { useEffect, useState } from 'react';
import Carousel from "react-bootstrap/Carousel";
import StockChart1 from '../images/home/stock-chart-1.jpg';
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={StockChart1}
                    />
                    <Carousel.Caption>
                        <h1>Use market-beating hedge fund manager’s option trading tactic to manage your portfolio.</h1>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                        <p><a class="btn btn-lg btn-primary" href="signin/register" role="button">Sign up today</a></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={StockChart1}
                    />
                    <Carousel.Caption>
                        <h1>One-stop Option Investing Analytics Software for Everyone.</h1>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        <p><a class="btn btn-lg btn-primary" href="signin/register" role="button">Sign up today</a></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="container marketing">

                <div className="row">
                    <div className="col-lg-4">
                        <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="140" height="140" />
                        <h2>Buy Call</h2>
                        <p>Find the best call option contract to buy.</p>
                        <p>
                            <Link className="btn btn-secondary" to="/buy-call" >Start &raquo;</Link>
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="140" height="140" />
                        <h2>Covered Call</h2>
                        <p>Explore covered call contracts to sell.</p>
                        <p><Link className="btn btn-secondary" to="/sell-covered-call" >Start &raquo;</Link></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="140" height="140" />
                        <h2>Buy Put</h2>
                        <p>Coming soon...</p>
                        <p><a className="btn btn-secondary" href="#" role="button">Start &raquo;</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="140" height="140" />
                        <h2>Cash Secured Put</h2>
                        <p>Coming soon...</p>
                        <p><a className="btn btn-secondary" href="#" role="button">Start &raquo;</a></p>
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">Our Customers Love Us. <span className="text-muted">It'll blow your mind.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <img className="featurette-image img-fluid mx-auto" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="500" height="500" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Oh yeah, it's that good. <span className="text-muted">See for yourself.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img className="featurette-image img-fluid mx-auto" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="500" height="500" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <img className="featurette-image img-fluid mx-auto" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="500" height="500" />
                    </div>
                </div>
            </div>
        </div>
    );
}