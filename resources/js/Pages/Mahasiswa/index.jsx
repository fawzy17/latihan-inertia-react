import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className='container container-fluid'>
            <h3>Data Mahasiswa</h3>
            <hr />
            <Link className='btn btn-sm btn-primary' as='button' type='button' href='mahasiswa/add' style={{ marginBottom: 10 }}>
                Tambah data
            </Link>

            {
                flash && flash.message && <div style={{ fontWeight: 'bold', color: 'green', marginBottom: 10 }}>{flash.message}</div>
            }
            <form onSubmit={searchData}>
                <div class="input-group mb-3">
                    <div className='col-mb-4'>
                        <input type="text" class="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari NPM atau Nama" />
                    </div>
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Cari</button>
                </div>
            </form>
            <table class="table table-bordered table-stripped table-sm">
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
                                    <button className='btn btn-sm btn-warning' onClick={() => updateData(mhs.id)} style={{ marginRight: 5 }}>Edit</button>
                                    <button className='btn btn-sm btn-danger' onClick={() => deleteData(mhs.id, mhs.nama)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        )
                    }
                </tbody>
            </table>

            <div style={{ marginTop: 5 }}>
                <ul class="pagination">
                    {mahasiswa.links.map((link, index) => {

                        if (link.url === null) {
                            return null;
                        }

                        let isActive = link.active;

                        let className = isActive ? "page-item active" : "page-item";
                        let linkLabel = link.label.replace(/&laquo;/, "<<").replace(/&raquo;/, ">>");

                        return (
                            <li className={className} key={index}>
                                <a className="page-link" disabled={isActive} onClick={() => Inertia.get(link.url)}>
                                    {linkLabel}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}