import { Button } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

export const ButtonLoadMore = ({ handleNextPage, isLoading }) => {
  return (
    <Button
      border="2px"
      borderColor="yellow.300"
      bg="yellow.200"
      _hover="background: yellow.200"
      className={styles.btnLoadMore}
      isLoading={isLoading}
      onClick={handleNextPage}
    >
      Load more
    </Button>
  )
}