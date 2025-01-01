"use client"
import { default_MarketStatus, default_NewsSentiments, Stock, top30_default } from "@/constants";
import * as React from "react";
import { useUserContext } from "@/components/contexts/UserContext";
import PopUp from "@/components/ui/PopUp/popup";
import List from "@/components/ui/List/List";
import { Config } from "@/constants/types";
import { NewsSentiments } from "@/components/contexts/types/MarketTypes";
import Listing from "@/components/ui/Listing/Listing";
import StockList from "@/components/ui/StockList/StockList";
import MarketStatus from "@/components/ui/MarketStatus/MarketStatus";

const Home = () => {

  const { markets } = default_MarketStatus;

  return (
    <div></div>
  )

  };



export default Home