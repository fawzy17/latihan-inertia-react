import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function form_add() {
    const [tNama, setNama] = useState('');
    const [tNpm, setNpm] = useState('');
    const [tJk, setJk] = useState('');
    const [tAlamat, setAlamat] = useState('');

    const [loading, setLoading] = useState(false);

    const { errors } = usePage().props;

    const saveData = (e) => {
        e.preventDefault();
        setLoading(true);

        const mahasiswa = { tNpm, tNama, tJk, tAlamat };
        Inertia.post('/mahasiswa', mahasiswa, {
            onFinish: () => setLoading(false)
        })
    }

    return (
        <>
            <h3>
                Form Tambah Mahasiswa
            </h3>
            <hr />
            <Link as='button' type='button' href='/mahasiswa' style={{ background: 'yellow', color: 'black', marginBottom: 10 }}>
                Kembali
            </Link>

            <form onSubmit={saveData}>
                <table border={0}>
                    <tr>
                        <td>Nama:</td>
                        <td>
                            <input type="text" value={tNama} onChange={(e) => setNama(e.target.value)} placeholder='Masukkan Nama Lengkap anda' />
                            {
                                errors.tNama && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.tNama}</div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Npm:</td>
                        <td>
                            <input maxLength={7} type="text" value={tNpm} onChange={(e) => setNpm(e.target.value)} placeholder='Masukkan Npm anda' />
                            {
                                errors.tNpm && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.tNpm}</div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Jenis Kelamin:</td>
                        <td>
                            <select onChange={(e) => setJk(e.target.value)}>
                                <option value="" selected={true}>-Pilih-</option>
                                <option value="L" >Laki-laki</option>
                                <option value="P" >Perempuan</option>
                            </select>
                            {
                                errors.tJk && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.tJk}</div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Alamat:</td>
                        <td>
                            <textarea value={tAlamat} onChange={(e) => setAlamat(e.target.value)} placeholder='Masukkan Alamat anda' cols={50} rows={5}></textarea>
                            {
                                errors.tAlamat && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.tAlamat}</div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type='submit' disabled={loading}>
                                {loading ? 'Process...' : 'Submit'}
                            </button>
                        </td>
                    </tr>
                </table>
            </form>
        </>
    )
}