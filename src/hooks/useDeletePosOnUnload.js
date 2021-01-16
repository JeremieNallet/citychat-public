import { useEffect } from "react";
import { firestore } from "../../lib/firebaseConfig";
import useStore from "../../lib/store";

const useDeletePosOnUnload = () => {
    const user = useStore((state) => state.user);
    useEffect(() => {
        const deleteUserInfos = (id) => {
            firestore.collection("positions").doc(id).delete();
        };
        if (user.connected && user.id) {
            window.addEventListener("beforeunload", (e) => {
                e.preventDefault();
                deleteUserInfos(user.id);
            });
            return () => {
                window.removeEventListener("beforeunload", (e) => {
                    e.preventDefault();
                    deleteUserInfos(user.id);
                });
            };
        }
    }, [user.connected, user.id]);
};

export default useDeletePosOnUnload;
