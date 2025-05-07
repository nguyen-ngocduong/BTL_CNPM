import {
  Badge,
  Button,
  Dropdown,
  Input,
  Pagination,
  Row,
  styled,
  Table,
  Text,
  FormElement,
} from '@nextui-org/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, memo, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '../../../components/common/AdminLayout';
import useAuth from '../../../libs/hooks/useAuth';
import useRoles from '../../../libs/hooks/useRoles';
import { useAdminSpecifications } from '../../../libs/swr/useAdminSpecifications';
import { SpecificationType } from '../../../types';

const columns = [
  { name: 'Tên sản phẩm', uid: 'product_name', width: 250 },
  { name: 'Hành động', uid: 'actions', width: 150 },
];


export const StyledBadge = styled('span', {
  display: 'inline-block',
  textTransform: 'uppercase',
  padding: '$2 $3',
  margin: '0 2px',
  fontSize: '10px',
  fontWeight: '$bold',
  borderRadius: '14px',
  letterSpacing: '0.6px',
  lineHeight: 1,
  boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
  alignItems: 'center',
  alignSelf: 'center',
  color: '$white',
});

export const IconButton = styled('button', {
  dflex: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  margin: '0',
  bg: 'transparent',
  transition: '$default',
  '&:hover': {
    opacity: '0.8',
  },
  '&:active': {
    opacity: '0.6',
  },
});

const deleteSpecification = async (id: number) => {
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/specifications/${id}`
  );
};

const IndexPage: NextPage = () => {
  useAuth(true);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Head>
        <title>Thông số kỹ thuật</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AdminLayout title='Thông số kỹ thuật'>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <Input
              clearable
              underlined
              labelPlaceholder='Tìm kiếm theo tên sản phẩm'
              css={{ maxWidth: '300px' }}
              value={searchTerm}
              onChange={(e: ChangeEvent<FormElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Button
              onPress={() => router.push('/admin/specification/add')}
              shadow
              color='secondary'
            >
              Tạo mới
            </Button>
          </div>
        </div>

        <div>
          <Page searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </AdminLayout>
    </>
  );
};

import { useMemo } from 'react';

interface PageProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const Page = memo(({ searchTerm, setSearchTerm }: PageProps) => {
  useRoles(['admin', 'manager', '/admin/dashboard']);
  const router = useRouter();
  const { data: session } = useSession();
  const { data, error, mutate } = useAdminSpecifications(null, session?.accessToken);

  console.log('Specification list data:', data);
  console.log('Specification list error:', error);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Bạn có chắc?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Đóng',
      preConfirm: async () => {
        try {
          const res = await deleteSpecification(id);
          return res;
        } catch (error: any) {
          Swal.showValidationMessage(`Xóa thất bại`);
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value?.status === 200) {
        Swal.fire({
          title: 'Xóa thành công!',
          icon: 'success',
        });
        await mutate();
      }
    });
  };

  const renderCell = (spec: SpecificationType, columnKey: React.Key) => {
    switch (columnKey) {
      case 'product_name':
        return (
          <Text
            b
            size={13}
            css={{
              color: '$accents7',
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={spec.product_name}
          >
            {spec.product_name}
          </Text>
        );

      default:
        return (
          <Row justify='center' align='center'>
            <Dropdown placement='bottom-right'>
              <Dropdown.Button
                ripple={false}
                css={{
                  background: '$gray100',
                  color: '$gray800',
                  '&:hover': {
                    background: '$gray200',
                  },
                  '&:active': {
                    background: '$gray300',
                  },
                  '&:focus': {
                    borderColor: '$gray400',
                  },
                }}
                flat
              ></Dropdown.Button>
              <Dropdown.Menu aria-label='Static Actions'>
                <Dropdown.Item key='edit' textValue='Sửa'>
                  <Text
                    color='inherit'
                    onClick={() => {
                      router.push('/admin/specification/update/' + spec.id);
                    }}
                  >
                    Sửa
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key='delete' color='error' textValue='Xóa'>
                  <Text
                    color='inherit'
                    onClick={() => {
                      handleDelete(spec.id);
                    }}
                  >
                    Xóa
                  </Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        );
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((spec) =>
      spec.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <>
      <Table
        aria-label='Specification table with actions'
        css={{
          height: 'auto',
          minWidth: '100%',
          tableLayout: 'fixed',
        }}
        color='secondary'
        // Removed selectionMode to disable checkboxes including select all
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.uid} width={column.width}>{column.name}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={filteredData}>
          {(item: SpecificationType) => (
            <Table.Row key={item.id}>
              {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
});

export default IndexPage;
