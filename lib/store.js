import create from "zustand";
import { FlyToInterpolator } from "react-map-gl";
import { easeExpOut } from "d3-ease";

export const initialState = {
    launchComplete: false,
    isMapLoaded: false,
    globalError: null,
    waveModalData: { state: false, user: null },
    viewPortState: {
        width: 400,
        height: 400,
        latitude: 38.5,
        longitude: -98.0,
        zoom: 12.8,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 500,
        transitionEasing: easeExpOut,
    },
    user: {
        name: null,
        emoji: null,
        place: null,
        coords: null,
        isAddingPosition: false,
        connected: false,
        id: null,
    },
    panel: {
        side: true,
        chat: false,
        notification: false,
        confirmModal: false,
        waveSuccess: false,
    },
};

const useStore = create((set) => ({
    ...initialState,

    setWaveModalData: (state, user) => {
        set(({ waveModalData }) => ({
            waveModalData: { ...waveModalData, state: state, user: user },
        }));
    },

    setLauchComplete: (Boolean) => {
        set({ launchComplete: Boolean });
    },

    setGlobalError: (val) => {
        set({ globalError: val });
    },

    setIsMapLoaded: () => {
        set({ isMapLoaded: true });
    },

    setNextViewport: (Object) => {
        set(() => ({ viewPortState: Object }));
    },
    setPanel: (value) => {
        set(({ panel }) => ({ panel: { ...panel, ...value } }));
    },

    setUser: (value) => {
        set(({ user }) => ({ user: { ...user, ...value } }));
    },

    updateViewport: (newAddedValues) => {
        set(({ viewPortState }) => ({
            viewPortState: {
                ...viewPortState,
                ...newAddedValues,
                transitionDuration: 500,
            },
        }));
    },
}));

export default useStore;
