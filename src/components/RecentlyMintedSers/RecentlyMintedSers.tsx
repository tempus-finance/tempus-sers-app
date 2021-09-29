import React from 'react';
import { Container, Grid, Fab, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { ethers } from "ethers";

import './RecentlyMintedSers.css';


const sers = [
    { id: 1, name: "Ser Cumberbatch Lolzalot" },
    { id: 2, name: "Ser Cumberbatch Lolzalot" },
    { id: 3, name: "Ser Cumberbatch Lolzalot" },
    { id: 4, name: "Ser Cumberbatch Lolzalot" },
    { id: 5, name: "Ser Cumberbatch Lolzalot" },
    { id: 6, name: "Ser Cumberbatch Lolzalot" },
    { id: 7, name: "Ser Cumberbatch Lolzalot" },
    { id: 8, name: "Ser Cumberbatch Lolzalot" },
    { id: 9, name: "Ser Cumberbatch Lolzalot" },
    { id: 10, name: "Ser Cumberbatch Lolzalot" }
]

const serCard = (serData: any) => (<Grid item xs={3}>
    {/* <Card sx={{ maxWidth: 180 }}> */}
    <Card>
      {/* <CardActionArea> */}
        <CardMedia
          component="img"
          image={`/TempSerz/${serData.id}.png`}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            { serData.name }
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      {/* </CardActionArea> */}
    </Card>
  </Grid>);


export default class RecentlyMintedSers extends React.Component {
    render() {
      return (<Container maxWidth="lg" className="RecentlyMintedSers">
          <h2>Recently Born Serz</h2>
            <Grid justifyContent="flex-start" alignItems="center" container spacing={8}>
            {/* <Grid justifyContent="flex-start" alignItems="center" container spacing={2}> */}
            { sers.map(serCard) }
            </Grid>
        </Container>);
    }
}
