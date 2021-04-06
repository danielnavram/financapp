import React, { useRef } from "react";
import { Flex, FlexItem, Card, Button, Icon, Modal } from "components/Common";
import { Layout } from "components/Layout";
import { useDisclosure } from "@chakra-ui/react";
import { TransactionsForm } from "components/Form/transactions/TransactionsForm";

export default function TransactionsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const transactionsRef = useRef();
  const handleSubmit = () => {
    if (transactionsRef.current) {
      transactionsRef.current.submitForm();
      onClose();
    }
  };

  return (
    <Layout user="true">
      <Flex>
        <FlexItem lg={8}>
          <Card
            title="Transactions"
            options={{
              button: (
                <Button
                  variant="primary"
                  icon={<Icon name="record" size="18px" />}
                  name="New Record"
                  onClick={onOpen}
                />
              ),
            }}
          >
            Transaction goes here
          </Card>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="New Record"
            handleSubmit={handleSubmit}
          >
            <TransactionsForm ref={transactionsRef} />
          </Modal>
        </FlexItem>
        <FlexItem lg={4}>
          <Card title="Transaction Details">Aqui va el otro contenido</Card>
        </FlexItem>
      </Flex>
    </Layout>
  );
}
