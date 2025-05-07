import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Modal, Row, Col } from '@nextui-org/react';

const fetchDeviceSpecs = async (productId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specifications/product/${productId}`);
  return response.json();
};

// Component DeviceSpecs
const Specifi: React.FC<{ productId: string }> = ({ productId }) => {
  const [specs, setSpecs] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  // Fetch specs khi component mount
  useEffect(() => {
    console.log('Fetching specs for product ID:', productId);

    const fetchSpecs = async () => {
      try {
        const data = await fetchDeviceSpecs(productId);
        // Nếu data là mảng, lấy phần tử đầu tiên
        if (Array.isArray(data)) {
          if (data.length > 0) {
            setSpecs(data[0]);
          } else {
            setSpecs({});
          }
        } else {
          setSpecs(data);
        }
        console.log('Fetched specs:', data);
      } catch (error) {
        console.error('Error fetching device specs:', error);
      }
    };

    fetchSpecs();
  }, [productId]);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  if (!specs) {
    return <Text>Loading...</Text>;
  }
  if (Object.keys(specs).length === 0) {
    return <Text>Không có thông số kỹ thuật cho sản phẩm này.</Text>;
  }
  return (
    <div style={{ padding: '0px', maxWidth: '600px' }}>
      <div style={{ 
          marginTop: '5%', 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '15px',
          padding: '10px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px' 
        }}>
        <FontAwesomeIcon 
          icon={faGear} 
          size="2x" 
          style={{ 
            marginRight: '8px', 
            color: '#7828C8', 
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)' 
          }} 
        />
        <Text 
          h2 
          style={{ 
            color: '#7828C8', 
            fontSize: '24px', 
            fontWeight: 'bold', 
            textTransform: 'uppercase' 
          }}
        >
          Thông số kĩ thuật
        </Text> 
      </div>
      <Card css={{ p: '$6', mw: '100%' }}>
        <Card.Body>
          <Row>
            <Col span={6}>
              <Text b>Tên sản phẩm</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.product_name}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Tần số quét</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.refresh_rate}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Công nghệ màn</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.technology}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Độ phân giải</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.resolution}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Kích thước màn</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.size}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Độ sáng</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.brightness}</Text>
            </Col>
          </Row>
          <Row justify="center" css={{ mt: '$4' }}>
            <Button onPress={handleOpenModal} type="submit" className="mt-2" shadow color='secondary' auto>
              Xem cấu hình chi tiết
            </Button>
          </Row>
        </Card.Body>
      </Card>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={handleCloseModal}
        width="800px"
      >
        <Modal.Header>
          <Text id="modal-title" size={24} color='#7828C8' b>
            Cấu hình chi tiết
          </Text>
        </Modal.Header>
        <Modal.Body>
          {/* Hiển thị tất cả thông số ở đây */}
          <Row>
            <Col span={6}>
              <Text b>Tên sản phẩm</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.product_name}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Tần số quét</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.refresh_rate}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Công nghệ màn</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.technology}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Độ phân giải</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.resolution}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Kích thước màn</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.size}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Độ sáng</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.brightness}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Tính năng</Text>
            </Col>
            <Col span={6}>
            <Text>{specs.features ? (Array.isArray(specs.features) ? specs.features.join(', ') : specs.features) : 'Không có thông tin'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Dung lượng pin</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.capacity}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Sạc nhanh</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.fast_charge}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Sạc không dây</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.wireless_charge}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Loại chip</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.chipset}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>RAM</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.ram}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Bộ nhớ</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.storage}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Chất liệu</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.material}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Trọng lượng</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.weight}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Kích thước tổng thể</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.dimensions}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>SIM</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.sim}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>GPS</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.gps}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Bluetooth</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.bluetooth}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Jack cắm</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.jack}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Wi-Fi</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.wifi}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>NFC</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.nfc}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>ID thông số</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.id}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Cảm biến</Text>
            </Col>
            <Col span={6}>
            <Text>{specs.sensors ? (Array.isArray(specs.sensors) ? specs.sensors.join(', ') : specs.sensors) : 'Không có thông tin'}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Chống nước</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.waterproof}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Hệ điều hành</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.name}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Phiên bản</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.version}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
             <Text b>ID sản phẩm</Text>
            </Col>
            <Col span={6}>
              <Text>{specs.productId}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text b>Loa</Text>
            </Col>
            <Col span={6}>
            <Text>{specs.speaker}</Text>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Specifi;
