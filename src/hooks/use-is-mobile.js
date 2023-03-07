import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * Determine if the curre media is a mobile
 */
export const useIsIsMobile = () => {
	const isMobile = useMediaQuery('(max-width:768px)')
	return isMobile
}
