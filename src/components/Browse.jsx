import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPosition } from "../mainSlice";
import { Box } from "@mui/material";

export default function Browse() {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return <>Browse Component</>;
}