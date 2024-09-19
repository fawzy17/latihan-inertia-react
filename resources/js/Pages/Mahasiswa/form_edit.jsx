import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function form_edit({ id, mhs }) {
    const [tNama, setNama] = useState(mhs.nama);
    const [tNpm, setNpm] = useState(mhs.npm);
    const [tJk, setJk] = useState(mhs.jk);
    const [tAlamat, setAlamat] = useState(mhs.alamat);

    const [loading, setLoading] = useState(false);

    const { errors } = usePage().props;

    const updateData = (e) => {
        e.preventDefault();
        setLoading(true);

        const mahasiswa = { tNama, tJk, tAlamat };
        Inertia.put(`/mahasiswa/${id}`, mahasiswa, {
            onFinish: () => setLoading(false)
        })
    }

    return (
        <div className='container container-fluid'>
            <h3>
                Form Ubah Mahasiswa
            </h3>
            <hr />
            <Link className='btn btn-sm btn-warning' as='button' type='button' href='/mahasiswa' style={{ marginBottom: 10 }}>
                Kembali
            </Link>

            <form onSubmit={updateData}>
                <div class="row mb-3">
                    <label class="form-label">Nama</label>
                    <div className='col-sm-4'>
                        <input type="text" className={`form-control ${errors.tNama && 'is-invalid'}`} value={tNama} onChange={(e) => setNama(e.target.value)} placeholder='Masukkan Nama Lengkap anda' />
                        {
                            errors.tNama && <div class="invalid-feedback">
                                {errors.tNama}
                            </div>
                        }
                    </div>
                </div>
                <div class="row mb-3">
                    <label class="form-label">NPM</label>
                    <div className='col-sm-4'>
                        <input type="text" className={`form-control ${errors.tNpm && 'is-invalid'}`} value={tNpm} onChange={(e) => setNpm(e.target.value)} disabled />
                        {
                            errors.tNpm && <div class="invalid-feedback">
                                {errors.tNpm}
                            </div>
                        }
                    </div>
                </div>
                <div class="row mb-3">
                    <label class="form-label">Jenis Kelamin</label>
                    <div className='col-sm-4'>
                        <select className={`form-select ${errors.tJk && 'is-invalid'}`} onChange={(e) => setJk(e.target.value)}>
                            <option value="L" selected={tJk == 'L' ? true : false}>Laki-laki</option>
                            <option value="P" selected={tJk == 'P' ? true : false}>Perempuan</option>
                        </select>
                        {
                            errors.tJk && <div class="invalid-feedback">
                                {errors.tJk}
                            </div>
                        }
                    </div>
                </div>
                <div class="row mb-3">
                    <label class="form-label">Alamat</label>
                    <div className='col-sm-4'>
                        <textarea className={`form-control ${errors.tAlamat && 'is-invalid'}`} value={tAlamat} onChange={(e) => setAlamat(e.target.value)} placeholder='Masukkan Alamat anda' />
                        {
                            errors.tAlamat && <div class="invalid-feedback">
                                {errors.tAlamat}
                            </div>
                        }
                    </div>
                </div>
                <button className='btn btn-sm btn-success' type='submit' disabled={loading}>
                    {loading ? 'Process...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}