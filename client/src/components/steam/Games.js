import React, { useEffect, useState, Fragment, useRef } from "react";
import { connect } from "react-redux";
import { getGames, getGameByAppId } from "../../actions/game";
import Spinner from "../layout/Spinner";
import GameMainImage from "./GameMainImage";
import {
  Row,
  Col,
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

/**
 * This component handles the Games page, which displays a top background and a couple of games which can go to their individual game page
 */
const Steam = ({ getGames, getGameByAppId, game: { games, loading } }) => {
  useEffect(() => {
    console.log("Get games...");
    getGames();
  }, [getGames]);

  return (
    <Fragment>
      {loading || !games ? (
        <Fragment>
          Loading games data...
          <Spinner></Spinner>
        </Fragment>
      ) : (
        <div style={{ width: "100%", margin: "0", paddingTop: "60px" }}>
          <GameMainImage
            image="https://gamessolvers.com/wp-content/uploads/2020/01/GTA-V-Banner.jpg"
            title="Games"
            text="search for games information"
          />

          <Container>
            <Row>
              {games.map((data, i) => (
                <Col key={i} className="spacing" lg="4" sm="6" xs="12">
                  <CardHostComponent {...data} />
                </Col>
              ))}
            </Row>
          </Container>

          {loading && <Spinner />}

          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="btn btn-primary">Load More</Button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const CardHostComponent = (props) => (
  <Card>
    <a href={`/game/${props.appid}`}>
      <CardImg top width="100%" src={props.header_image} alt="Card image cap" />
    </a>
    <CardBody>
      <a href={`/game/${props.appid}`}>
        <CardTitle>{props.name}</CardTitle>
      </a>
      <CardSubtitle>{}</CardSubtitle>
    </CardBody>
  </Card>
);

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = {
  getGames,
  getGameByAppId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Steam);
