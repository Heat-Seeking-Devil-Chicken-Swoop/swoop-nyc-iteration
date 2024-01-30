import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavPosition } from '../mainSlice';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Loader } from '@googlemaps/js-api-loader';
import { act } from 'react-test-renderer';

export default function ViewListing() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADQU5Oic0aAZjytCZzVbo8MZOQSgNPqA4',
      version: 'weekly',
    });
    createMap({ lat: 40.706086, lng: -73.996864 }, 'listingMap', loader); // createMap where div id="listingMap"
  }, []);

  /********* Determine which listing to render to page ***********/
  const activeListing = state.activeListing;
  const listings = state.listings;
  // console.log(listings)
  // console.log(typeof activeListing);
  const listingToRender = [];

  const getListingById = (listingId) => {
    for (let listing of listings) {
      if (listing._id === parseInt(listingId)) {
        listingToRender.push(
          <Box alignContent="center">
            <img className="squareImg" src={listing.url} />
          </Box>
        );
        return;
      }
    }
  };

  getListingById(activeListing);

  async function createMap(center, div, loader) {
    loader.importLibrary('core').then(() => {
      const newMap = new google.maps.Map(document.getElementById(div), {
        center: center, // {lat, lng}
        zoom: 15,
        disableDefaultUI: true,
      });
      //add marker to the newly created map
      const newMarker = new google.maps.Marker({
        position: center, // {lat, lng}
        map: newMap,
      });
    });
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        padding="0 50"
        marginBottom={'50'}
      >
        <Box
          display="flex"
          textAlign="left"
          alignItems="flexStart"
          sx={{ margin: '20' }}
        >
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceOutlinedIcon />}
            size="small"
            sx={{ marginRight: '230' }}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </Box>
        {listingToRender}
        <Box margin="10 0">
          <Chip label="Chair" sx={{ padding: '0 5', margin: '5' }} />
          <Chip label="Blue" sx={{ padding: '0 5', margin: '5' }} />
          <Chip label="Big chair" sx={{ padding: '0 5', margin: '5' }} />
          <Chip label="Blue chair" sx={{ padding: '0 5', margin: '5' }} />
          <Chip label="Blue" sx={{ padding: '0 5', margin: '5' }} />
        </Box>

        <Box display="flex" flexWrap="wrap" padding="10 0">
          <Typography variant="body1" color="inherit" component="div">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Box>

        <Box width="100%" height={'200'} marginTop="20">
          <div id="listingMap" style={{ height: '100%', width: '100%' }}></div>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignContent="space-between"
          padding="10px"
          marginTop={'20'}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              margin: '0 10 20 10',
              padding: '10 20',
              backgroundColor: 'red',
            }}
          >
            Mark as Taken
          </Button>
        </Box>
      </Box>
    </>
  );
}