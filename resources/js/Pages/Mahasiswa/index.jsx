import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function index({ mahasiswa }) {
    const { flash } = usePage().props;
    const deleteData = (id, nama) => {
        if (confirm(`Apakah yakin menghapus data mahasiswa ${nama}?`)) {
            Inertia.delete(`/mahasiswa/${id}`)
        }
    }
    const updateData = (id, nama) => {
        Inertia.get(`/mahasiswa/${id}`)
    }
    return (
        <div>
            <h3>Data Mahasiswa</h3>
            <hr />
            <Link as='button' type='button' href='mahasiswa/add' style={{ background: 'green', color: 'white', marginBottom: 10 }}>
                Tambah data
            </Link>

            {
                flash && flash.message && <div style={{ fontWeight: 'bold', color: 'green', marginBottom: 10 }}>{flash.message}</div>
            }

            <table border={1} cellPadding={5} style={{
                borderCollapse: 'collapse'
            }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>NPM</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mahasiswa.length === 0 ? (
                            <tr>
                                <th colSpan={5}>Data Kosong...</th>
                            </tr>
                        ) : (mahasiswa.map((mhs, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{mhs.nama}</td>
                                <td>{mhs.npm}</td>
                                <td>{mhs.jk == 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                                <td>{mhs.alamat}</td>
                                <td>
                                    <button onClick={() => updateData(mhs.id)} style={{ marginRight: 5 }}>Edit</button>
                                    <button onClick={() => deleteData(mhs.id, mhs.nama)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}