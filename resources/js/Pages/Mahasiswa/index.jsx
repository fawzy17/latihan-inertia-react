import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function index({ mahasiswa, filters }) {
    const { flash } = usePage().props;

    const [search, setSearch] = useState(filters.search || '');

    const deleteData = (id, nama) => {
        if (confirm(`Apakah yakin menghapus data mahasiswa ${nama}?`)) {
            Inertia.delete(`/mahasiswa/${id}`)
        }
    }
    const updateData = (id) => {
        Inertia.get(`/mahasiswa/${id}`)
    }

    const searchData = (e) => {
        e.preventDefault();
        Inertia.get('/mahasiswa', { search }, { preserveState: true });
    }

    const startNumber = (mahasiswa.current_page - 1) * mahasiswa.per_page;

    console.log(mahasiswa)

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
            <form onSubmit={searchData}>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type='submit'>Cari</button>
            </form>
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
                        mahasiswa.data && mahasiswa.data.length === 0 ? (
                            <tr>
                                <th colSpan={5}>Data Kosong...</th>
                            </tr>
                        ) : (mahasiswa.data.map((mhs, index) => (
                            <tr key={index}>
                                <td>{startNumber + index + 1}</td>
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

            <div style={{ marginTop: 10 }}>
                {mahasiswa.links.map((link, index) => {
                    let isActive = link.active;

                    const linkActive = isActive ? { fontWeight: 'bold', textDecoration: 'underline', marginRight: 5 } : { marginRight: 5 };

                    let linkLabel = link.label;
                    if (linkLabel.includes('raquo')) {
                        linkLabel = 'Next >>';
                    }
                    if (linkLabel.includes('laquo')) {
                        linkLabel = '<< Prev';
                    }
                    return (
                        <button key={index} onClick={() => Inertia.get(link.url)} style={linkActive} disabled={isActive} >
                            {linkLabel}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}