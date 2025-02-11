import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//* WORKING✅
export const getCountryData = async (
    setData: UseStateFunc<any>,
    toast?: (options?: UseToastOptions | undefined) => ToastId,
    perPage?: number,
    page?: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    try {
        await privateGateway
            .get(ManageLocationsRoutes.getCountryData, {
                params: {
                    perPage: perPage,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            })
            .then(({ data }) => data.response)
            .then(({ data, pagination }) => {
                console.log(data);
                setData(data);
                if (setTotalPages) setTotalPages(pagination.totalPages);
            });
    } catch (err: any) {
        if (err?.response) {
            const errorMsg = err.response?.data?.message?.general[0] ?? "";
            if (!toast) return console.log(errorMsg);
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

//*WORKING ✅
export const postCountryData = async (
    countryName: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway
            .post(ManageLocationsRoutes.getCountryData, {
                name: countryName
            })
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
            });
    } catch (err: any) {
        if (err?.response) {
            const errorMsg = err.response.data.message.general[0];
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

//*WORKING ✅
export const patchCountryData = async (
    countryID: string,
    newName: string,
    toast?: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        console.log(countryID);
        await privateGateway
            .patch(
                ManageLocationsRoutes.patchCountryData.replace(
                    "${country}",
                    countryID
                ),
                {
                    id: countryID,
                    name: newName
                }
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*WORKING ✅
export const deleteCountryData = async (
    id: string,
    toast?: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway
            .delete(
                ManageLocationsRoutes.patchCountryData.replace("${country}", id)
                // {
                //     name: countryName
                // }
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
                window.location.reload(); // TODO: Temporary fix, better solution needed (delete takes time, API fetch after delete doesnt give the omitted data)
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
