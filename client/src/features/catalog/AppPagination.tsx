import { Box, Pagination } from "@mui/material";


interface IAppPaginationProps {
    totalPages: number,
    pageNumber: number,
    onPageChange: (page: number) => void
}

export const AppPagination = (paginationProps: IAppPaginationProps) => {

    return (


    <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Pagination color='secondary' size='large' count={paginationProps.totalPages} page={paginationProps.pageNumber} onChange={(e, page) => paginationProps.onPageChange(page)} />
    </Box>
    );
}