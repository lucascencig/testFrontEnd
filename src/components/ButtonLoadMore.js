import { Button } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

export const ButtonLoadMore = ({ handleNextPage, isLoading }) => {
  return (
    <Button
      border="2px"
      borderColor="cyan.300"
      bg="Cyan.200"
      className={styles.btnLoadMore}
      isLoading={isLoading}
      onClick={handleNextPage}
    >
      Load more
    </Button>
  )
}