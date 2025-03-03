import { Modal } from "antd";
import React from "react";
import UpdateCookie from "./updateCookie";

function UpdateCookieModal({
  openEditModal,
  setOpenEditModal,
  modalContent,
  loading,
}) {
  return (
    <>
      <Modal
        footer={null}
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        confirmLoading={loading}
        width={1000}
        style={{ maxWidth: "110vw" }}
      >
        <UpdateCookie
          modalContent={modalContent}
          setOpenEditModal={setOpenEditModal}
        />
      </Modal>
    </>
  );
}

export default UpdateCookieModal;
