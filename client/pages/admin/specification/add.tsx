import {
  Button,
  Input,
  Grid,
  Row,
  Spacer,
  Dropdown,
} from '@nextui-org/react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '../../../components/common/AdminLayout';
import useAuth from '../../../libs/hooks/useAuth';
import { useAdminProducts } from '../../../libs/swr/useAdminProducts';
import { useAdminSpecifications } from '../../../libs/swr/useAdminSpecifications';
import { ProductType } from '../../../types';

const AddSpecificationPage: NextPage = () => {
  useAuth(true);
  const router = useRouter();
  const { data: session } = useSession();

  // Lấy danh sách sản phẩm với giới hạn 100 sản phẩm
  const { data } = useAdminProducts('?limit=100', session?.accessToken);
  const products: ProductType[] = data?.items || [];

  // Lấy danh sách specification hiện có
  const { data: specifications } = useAdminSpecifications(null, session?.accessToken);
  const existingProductIds = specifications?.map(spec => spec.productId) || [];

  // Lọc sản phẩm chưa có specification
  const filteredProducts = products.filter(product => !existingProductIds.includes(product.id));

  // State lưu id sản phẩm được chọn và tên sản phẩm
  const [productId, setProductId] = useState<string>('');
  const [product_name, setProductName] = useState('');
  const [refresh_rate, setRefreshRate] = useState('');
  const [technology, setTechnology] = useState('');
  const [resolution, setResolution] = useState('');
  const [size, setSize] = useState('');
  const [brightness, setBrightness] = useState('');
  const [features, setFeatures] = useState('');
  const [capacity, setCapacity] = useState('');
  const [fast_charge, setFastCharge] = useState('');
  const [wireless_charge, setWirelessCharge] = useState('');
  const [chipset, setChipset] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [sim, setSim] = useState('');
  const [wifi, setWifi] = useState('');
  const [bluetooth, setBluetooth] = useState('');
  const [gps, setGps] = useState('');
  const [nfc, setNfc] = useState('');
  const [material, setMaterial] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [waterproof, setWaterproof] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [jack, setJack] = useState('');
  const [sensors, setSensors] = useState('');

  // Khi chọn sản phẩm, cập nhật tên sản phẩm tương ứng
  useEffect(() => {
    if (productId && products.length > 0) {
      const selectedProduct = products.find((p) => String(p.id) === productId);
      if (selectedProduct) {
        setProductName(selectedProduct.name);
      }
    }
  }, [productId, products]);
  

  const handleSubmit = async () => {
    if (!name) {
      Swal.fire('Lỗi', 'Tên thông số không được để trống', 'error');
      return;
    }
    if (!productId) {
      Swal.fire('Lỗi', 'Vui lòng chọn sản phẩm', 'error');
      return;
    }
    try {
      // Bước 1: Tạo specification
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          productId: Number(productId),
          product_name,
          refresh_rate,
          technology,
          resolution,
          size,
          brightness,
          features,
          capacity,
          fast_charge,
          wireless_charge,
          chipset,
          ram,
          storage,
          name,
          version,
          sim,
          wifi,
          bluetooth,
          gps,
          nfc,
          material,
          weight,
          dimensions,
          waterproof,
          speaker,
          jack,
          sensors,
        }),
      });
      if (res.ok) {
        Swal.fire('Thành công', 'Tạo thông số kỹ thuật thành công', 'success');
        router.push('/admin/specification');
      } else {
        const errorData = await res.json();
        Swal.fire('Lỗi', `Tạo thông số kỹ thuật thất bại: ${errorData.message || 'Không rõ lỗi'}`, 'error');
      }
    } catch (error: any) {
      Swal.fire('Lỗi', `Có lỗi xảy ra: ${error.message || error}`, 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Thêm thông số kỹ thuật</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminLayout title="Thêm thông số kỹ thuật">
        <Grid.Container gap={2} justify="flex-start">
          <Grid xs={12}>
          <Dropdown>
          <Dropdown.Button flat css={{
            maxWidth: '300px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {product_name || 'Chọn sản phẩm'}
          </Dropdown.Button>
  <Dropdown.Menu
    aria-label="Sản phẩm"
    onAction={(key) => setProductId(key as string)}
  >
          {filteredProducts.map((product: ProductType) => (
            <Dropdown.Item key={String(product.id)} css={{
              maxWidth: '300px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {product.name}
            </Dropdown.Item>
          ))}
  </Dropdown.Menu>
</Dropdown>

          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Tần số quét"
              placeholder="Nhập tần số quét"
              value={refresh_rate}
              onChange={(e) => setRefreshRate(e.target.value)}
            />
          </Grid>
          {/* Các input còn lại giữ nguyên */}
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Công nghệ màn"
              placeholder="Nhập công nghệ màn"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Độ phân giải"
              placeholder="Nhập độ phân giải"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Kích thước màn"
              placeholder="Nhập kích thước màn"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Độ sáng"
              placeholder="Nhập độ sáng"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Tính năng"
              placeholder="Nhập tính năng"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Dung lượng"
              placeholder="Nhập dung lượng"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Sạc nhanh"
              placeholder="Nhập sạc nhanh"
              value={fast_charge}
              onChange={(e) => setFastCharge(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Sạc không dây"
              placeholder="Nhập sạc không dây"
              value={wireless_charge}
              onChange={(e) => setWirelessCharge(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Loại chip"
              placeholder="Nhập loại chip"
              value={chipset}
              onChange={(e) => setChipset(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="RAM"
              placeholder="Nhập RAM"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Bộ nhớ"
              placeholder="Nhập bộ nhớ"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Hệ điều hành"
              placeholder="Nhập hệ điều hành"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Phiên bản"
              placeholder="Nhập phiên bản"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Sim"
              placeholder="Nhập sim"
              value={sim}
              onChange={(e) => setSim(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Wifi"
              placeholder="Nhập wifi"
              value={wifi}
              onChange={(e) => setWifi(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Bluetooth"
              placeholder="Nhập bluetooth"
              value={bluetooth}
              onChange={(e) => setBluetooth(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="GPS"
              placeholder="Nhập GPS"
              value={gps}
              onChange={(e) => setGps(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="NFC"
              placeholder="Nhập NFC"
              value={nfc}
              onChange={(e) => setNfc(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Chất liệu"
              placeholder="Nhập chất liệu"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Trọng lượng"
              placeholder="Nhập trọng lượng"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Kích thước tổng thể"
              placeholder="Nhập kích thước tổng thể"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Chống nước"
              placeholder="Nhập chống nước"
              value={waterproof}
              onChange={(e) => setWaterproof(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Loa"
              placeholder="Nhập loa"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Jack cắm"
              placeholder="Nhập jack cắm"
              value={jack}
              onChange={(e) => setJack(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              clearable
              bordered
              fullWidth
              label="Cảm biến"
              placeholder="Nhập cảm biến"
              value={sensors}
              onChange={(e) => setSensors(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Spacer y={1} />
            <Row justify="flex-end">
              <Button auto shadow color="secondary" onPress={handleSubmit}>
                Tạo mới
              </Button>
            </Row>
          </Grid>
        </Grid.Container>
      </AdminLayout>
    </>
  );
};

export default AddSpecificationPage;
