import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const nftinitialstate = {};

const nftslice = createSlice({
  name: "nft",
  initialState: nftinitialstate,
  reducers: {},
});

export default nftslice.reducer;
